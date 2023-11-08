import {createParamDecorator, ExecutionContext, SetMetadata} from '@nestjs/common';

export const CurrentUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        console.log(request.user)
        //console.log(`id: in decorator`,request)
        return request.user;
    }
)

