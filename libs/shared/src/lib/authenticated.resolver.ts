import { GqlAuthGuard } from '@int-garage-management-monorepo/shared';
import { UseGuards } from '@nestjs/common';

@UseGuards(GqlAuthGuard)
export class AuthenticatedResolver {}
