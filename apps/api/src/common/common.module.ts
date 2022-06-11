import { Global, Module } from "@nestjs/common"
import { PubSub } from "graphql-subscriptions"
import { PUB_SUB } from "src/common/common.constants"

const pubsub = new PubSub()

@Global()
@Module({
  providers: [
    {
      provide: PUB_SUB,
      useValue: pubsub,
    },
  ],
  exports: [PUB_SUB],
})
export class CommonModule {}
