locals{
  # load balancer variables
  load-balancer-properties = {
    load-balancer-name    = "ecs-lb"
    load-balancer-type    = "application"
    load-balancer-tg-name = "ecs-lb-tg"
    port                  = "${local.ecs-properties.ecs-container-port}"

    load-balancer-sg-tag-value = "ecs-load-balancer-sg"
  }

  load-balancer-tg-arn = module.load-balancer.load-balancer-tg-arn
  load-balancer-sg-id  = module.load-balancer.load-balancer-sg-id

  # ecs variables
  ecs-properties = {
    ecs-cluster-name             = "ecs-cluster"
    ecs-task-execution-role-name = "ecs-task-execution-role"
    ecs-task-family              = "ecs-task-family"
    ecs-task-name                = "ecs-task"
    ecs-container-image = "nginx"
    ecs-container-name = "Container1"
    ecs-container-port = "8080"
    s3-config-bucket             = "${local.s3-properties.s3-bucket-name}"
    s3-config-path               = ""
    ecs-service-name             = "ecs-service"

    ecs-service-sg-tag-value = "ecs-service-sg"
  }

  ecs-container-definition = <<DEFINITION
    [
      {
        "name": "${local.ecs-properties.ecs-container-name}",
        "image": "${local.ecs-properties.ecs-dockerhub-repository-url}",
        "cpu": 512,
        "memory": 1024,
        "essential": true,
        "portMappings": [
          {
            "containerPort": ${local.ecs-properties.ecs-container-port},
            "hostPort": ${local.ecs-properties.ecs-container-port}
          }
        ],
        "environment": [
          {
            "name": "S3_CONFIG_BUCKET",
            "value": "${local.ecs-properties.s3-config-bucket}"
          },
          {
            "name": "S3_CONFIG_PATH",
            "value": "${local.ecs-properties.s3-config-path}"
          }
        ]
      }
    ]
    DEFINITION
}