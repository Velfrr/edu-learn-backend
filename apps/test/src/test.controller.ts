import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateTestDto,
  UpdateTestDto,
  GetTestByIdDto,
  GetTestsByCourseDto,
  SubmitAttemptDto,
  GetTestAttemptsDto,
  HasPassedTestDto,
} from '@shared/common';
import { TestService } from './test.service';

@Controller()
export class TestController {
  constructor(private readonly testService: TestService) {}

  @MessagePattern({ role: 'test', cmd: 'create' })
  create(@Payload() dto: CreateTestDto) {
    return this.testService.createTest(dto);
  }

  @MessagePattern({ role: 'test', cmd: 'update' })
  update(@Payload() dto: UpdateTestDto) {
    return this.testService.updateTest(dto);
  }

  @MessagePattern({ role: 'test', cmd: 'delete' })
  delete(@Payload() id: string) {
    return this.testService.deleteTest(id);
  }

  @MessagePattern({ role: 'test', cmd: 'getById' })
  getById(@Payload() dto: GetTestByIdDto) {
    return this.testService.getTestById(dto.testId);
  }

  @MessagePattern({ role: 'test', cmd: 'getByCourse' })
  getByCourse(@Payload() dto: GetTestsByCourseDto) {
    return this.testService.getTestsByCourse(dto.courseId);
  }

  @MessagePattern({ role: 'test', cmd: 'submitAttempt' })
  submitAttempt(@Payload() dto: SubmitAttemptDto) {
    return this.testService.submitAttempt(dto);
  }

  @MessagePattern({ role: 'test', cmd: 'getAttempts' })
  getAttempts(@Payload() dto: GetTestAttemptsDto) {
    return this.testService.getAttemptsByUser(dto);
  }

  @MessagePattern({ role: 'test', cmd: 'hasPassed' })
  hasPassed(@Payload() dto: HasPassedTestDto) {
    return this.testService.hasPassedTest(dto);
  }
}
