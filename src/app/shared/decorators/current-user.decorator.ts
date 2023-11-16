import {createParamDecorator, ExecutionContext, Logger} from '@nestjs/common';
export const CurrentUser = createParamDecorator(
    (ctx: ExecutionContext) => {
        Logger.verbose(`@CurrentUser decorator used`)

        const request = ctx.switchToHttp().getRequest();
        Logger.verbose(`id @CurrentUser decorator: ${request.user.id}`)
        return request.user;

    }
)

