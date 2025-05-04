import { Controller } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { GetCourseAnalyticsDto } from '@shared/common/dto/analytics';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @MessagePattern({ role: 'analytics', cmd: 'getCourseAnalytics' })
  getCourseAnalytics(@Payload() dto: GetCourseAnalyticsDto) {
    return this.analyticsService.getCourseAnalytics(dto.teacherId);
  }
}
