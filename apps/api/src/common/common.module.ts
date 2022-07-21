import { Global, Module } from "@nestjs/common"
import { PubSub } from "graphql-subscriptions"
import { PUB_SUB } from "src/common/common.constants"

const pubSub = new PubSub()

@Global()
@Module({
  providers: [
    {
      provide: PUB_SUB,
      useValue: pubSub,
    },
  ],
  exports: [PUB_SUB],
})
export class CommonModule {}
