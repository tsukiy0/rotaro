import path from "path";
import { Construct, RemovalPolicy, Duration } from "@aws-cdk/core";
import { Bucket } from "@aws-cdk/aws-s3";
import {
  CloudFrontWebDistribution,
  OriginProtocolPolicy,
} from "@aws-cdk/aws-cloudfront";
import { BucketDeployment, Source } from "@aws-cdk/aws-s3-deployment";

export class WebConstruct extends Construct {
  public readonly url: string;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    const bucket = new Bucket(this, "Bucket", {
      websiteIndexDocument: "index.html",
      websiteErrorDocument: "index.html",
      publicReadAccess: true,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    new BucketDeployment(this, "BucketDeployment", {
      destinationBucket: bucket,
      sources: [Source.asset(path.resolve(__dirname, "../../../web/out"))],
    });

    const cdn = new CloudFrontWebDistribution(this, "CloudFront", {
      originConfigs: [
        {
          customOriginSource: {
            domainName: bucket.bucketWebsiteDomainName,
            originProtocolPolicy: OriginProtocolPolicy.HTTP_ONLY,
          },
          behaviors: [
            {
              isDefaultBehavior: true,
            },
            {
              pathPattern: "*.html",
              defaultTtl: Duration.minutes(0),
              minTtl: Duration.minutes(0),
              maxTtl: Duration.minutes(0),
            },
            {
              pathPattern: "config.json",
              defaultTtl: Duration.minutes(0),
              minTtl: Duration.minutes(0),
              maxTtl: Duration.minutes(0),
            },
          ],
        },
      ],
    });

    this.url = cdn.distributionDomainName;
  }
}
