import { FormsComponentModule } from './forms-component.module';

describe('FormsComponentModule', () => {
  let formsComponentModule: FormsComponentModule;

  beforeEach(() => {
    formsComponentModule = new FormsComponentModule();
  });

  it('should create an instance', () => {
    expect(formsComponentModule).toBeTruthy();
  });
});
