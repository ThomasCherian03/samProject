module "load-balancer" {
  source = "github.com/sahilphule/templates/terraform/modules/aws/load-balancer"

  vpc-id                   = local.vpc-id
  vpc-public-subnets       = local.vpc-public-subnets
  load-balancer-properties = local.load-balancer-properties
}

module "ecs" {
  source = "github.com/sahilphule/templates/terraform/modules/aws/ecs"

#   vpc-id              = local.vpc-id
#   vpc-public-subnets  = local.vpc-public-subnets

  ecs-properties           = local.ecs-properties
  ecs-container-definition = local.ecs-container-definition
  target-group-arn         = local.load-balancer-tg-arn
  load-balancer-sg-id      = local.load-balancer-sg-id

  depends_on = [
    module.s3,
    module.rds
  ]
}