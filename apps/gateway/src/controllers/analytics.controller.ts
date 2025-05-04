import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserRole } from '@shared/common';
import { GetCourseAnalyticsDto } from '@shared/common/dto/analytics';
import { Roles } from '../decorators';
import { AuthGuard } from '../guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Analytics')
@ApiBearerAuth()
@Controller('analytics')
@UseGuards(AuthGuard)
export class AnalyticsController {
  constructor(@Inject('ANALYTICS_SERVICE') private readonly analyticsClient: ClientProxy) {}

  @Get('courses')
  @Roles(UserRole.TEACHER)
  @ApiOperation({ summary: 'Отримати аналітику курсів для викладача' })
  @ApiResponse({ status: 200, description: 'Успішно отримано аналітику курсів' })
  getCourseAnalytics(@Query() query: GetCourseAnalyticsDto) {
    return this.analyticsClient.send({ role: 'analytics', cmd: 'getCourseAnalytics' }, query);
  }
}
