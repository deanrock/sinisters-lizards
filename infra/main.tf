module "us-east-1" {
  source        = "./modules/runner"
  region        = "us-east-1"
  instance_type = "t3.micro"
  public_key    = tls_private_key.this.public_key_openssh
}

module "us-east-2" {
  source     = "./modules/runner"
  region     = "us-east-2"
  public_key = tls_private_key.this.public_key_openssh
}

module "us-west-1" {
  source     = "./modules/runner"
  region     = "us-west-1"
  public_key = tls_private_key.this.public_key_openssh
}

module "us-west-2" {
  source     = "./modules/runner"
  region     = "us-west-2"
  public_key = tls_private_key.this.public_key_openssh
}

module "ca-central-1" {
  source     = "./modules/runner"
  region     = "ca-central-1"
  public_key = tls_private_key.this.public_key_openssh
}

module "eu-west-1" {
  source     = "./modules/runner"
  region     = "eu-west-1"
  public_key = tls_private_key.this.public_key_openssh
}

module "eu-west-2" {
  source     = "./modules/runner"
  region     = "eu-west-2"
  public_key = tls_private_key.this.public_key_openssh
}

module "eu-west-3" {
  source     = "./modules/runner"
  region     = "eu-west-3"
  public_key = tls_private_key.this.public_key_openssh
}

module "eu-central-1" {
  source     = "./modules/runner"
  region     = "eu-central-1"
  public_key = tls_private_key.this.public_key_openssh
}

/*
module "eu-south-1" {
  source     = "./modules/runner"
  region     = "eu-south-1"
  public_key = tls_private_key.this.public_key_openssh
}

module "eu-north-1" {
  source     = "./modules/runner"
  region     = "eu-north-1"
  public_key = tls_private_key.this.public_key_openssh
}
*/

module "ap-northeast-1" {
  source     = "./modules/runner"
  region     = "ap-northeast-1"
  public_key = tls_private_key.this.public_key_openssh
}

module "ap-northeast-2" {
  source     = "./modules/runner"
  region     = "ap-northeast-2"
  public_key = tls_private_key.this.public_key_openssh
}

module "ap-southeast-1" {
  source     = "./modules/runner"
  region     = "ap-southeast-1"
  public_key = tls_private_key.this.public_key_openssh
}

module "ap-southeast-2" {
  source     = "./modules/runner"
  region     = "ap-southeast-2"
  public_key = tls_private_key.this.public_key_openssh
}

module "ap-south-1" {
  source     = "./modules/runner"
  region     = "ap-south-1"
  public_key = tls_private_key.this.public_key_openssh
}

module "sa-east-1" {
  source     = "./modules/runner"
  region     = "sa-east-1"
  public_key = tls_private_key.this.public_key_openssh
}

/*
module "af-south-1" {
  source     = "./modules/runner"
  region     = "af-south-1"
  public_key = tls_private_key.this.public_key_openssh
}
*/
