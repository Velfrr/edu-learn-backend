import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserRole } from '@shared/common';
import { GetCourseAnalyticsDto } from '@shared/common/dto/analytics';
import { Roles } from '../decorators';
import { AuthGuard } from '../guard';

@Controller('analytics')
@UseGuards(AuthGuard)
export class AnalyticsController {
  constructor(@Inject('ANALYTICS_SERVICE') private readonly analyticsClient: ClientProxy) {}

  @Get('courses')
  @Roles(UserRole.TEACHER)
  getCourseAnalytics(@Query() query: GetCourseAnalyticsDto) {
    return this.analyticsClient.send({ role: 'analytics', cmd: 'getCourseAnalytics' }, query);
  }
}
