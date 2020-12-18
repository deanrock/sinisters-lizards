provider "aws" {
  region = var.region
}

data "aws_availability_zones" "available" {
  state = "available"
}

data "aws_route53_zone" "selected" {
  name = "deki.icu."
}

data "aws_ami" "default" {
  most_recent = true

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-2.0.2020*"]
  }

  filter {
    name   = "architecture"
    values = ["x86_64"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  filter {
    name   = "root-device-type"
    values = ["ebs"]
  }

  owners = ["amazon"]
}

resource "aws_vpc" "main" {
  cidr_block                       = "192.168.0.0/16"
  assign_generated_ipv6_cidr_block = "true"
  enable_dns_support               = "true"
  enable_dns_hostnames             = "true"

  tags = {
    Name = "cdn-${var.region}"
  }
}

resource "aws_internet_gateway" "default" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "hackaton-${var.region}-igw"
  }
}

resource "aws_subnet" "public" {
  count                   = length(data.aws_availability_zones.available.names)
  vpc_id                  = aws_vpc.main.id
  cidr_block              = cidrsubnet(aws_vpc.main.cidr_block, 8, count.index)
  map_public_ip_on_launch = true
  availability_zone       = element(data.aws_availability_zones.available.names, count.index)

  tags = {
    Name = "hackaton-${element(data.aws_availability_zones.available.names, count.index)}-public"
  }
}

resource "aws_route_table" "public" {
  count  = length(data.aws_availability_zones.available.names)
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.default.id
  }

  route {
    ipv6_cidr_block = "::/0"
    gateway_id      = aws_internet_gateway.default.id
  }
}

resource "aws_route_table_association" "public" {
  count          = length(data.aws_availability_zones.available.names)
  subnet_id      = element(aws_subnet.public.*.id, count.index)
  route_table_id = element(aws_route_table.public.*.id, count.index)
}

resource "aws_security_group" "default" {
  vpc_id = aws_vpc.main.id

  ingress {
    from_port   = -1
    to_port     = -1
    protocol    = "icmp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port        = 22
    to_port          = 22
    protocol         = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

data "template_file" "init" {
  template = file("./modules/runner/init.sh")

  vars = {}
}

resource "aws_instance" "server" {
  instance_type          = var.instance_type
  ami                    = data.aws_ami.default.id
  subnet_id              = aws_subnet.public.0.id
  vpc_security_group_ids = [aws_security_group.default.id, aws_vpc.main.default_security_group_id]

  tags = {
    Name = "hackaton-runner"
  }

  key_name = "hackaton"

  user_data = data.template_cloudinit_config.init.rendered

  root_block_device {
    volume_size = "100"
    encrypted   = true
  }
}

data "template_cloudinit_config" "init" {
  gzip          = false
  base64_encode = false

  part {
    content_type = "text/x-shellscript"
    content      = data.template_file.init.rendered
  }
}

resource "aws_route53_record" "runner" {
  zone_id = data.aws_route53_zone.selected.zone_id
  name = format(
    "%s.runner.hackaton.%s",
    var.region,
    data.aws_route53_zone.selected.name,
  )
  type    = "A"
  ttl     = "60"
  records = [aws_instance.server.public_ip]
}

module "key_pair" {
  source = "terraform-aws-modules/key-pair/aws"

  key_name   = "hackaton"
  public_key = var.public_key
}
