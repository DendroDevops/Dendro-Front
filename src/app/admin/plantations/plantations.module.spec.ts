import { PlantationsModule } from './plantations.module';

describe('PlantationsModule', () => {
  let plantationsModule: PlantationsModule;

  beforeEach(() => {
    plantationsModule = new PlantationsModule();
  });

  it('should create an instance', () => {
    expect(plantationsModule).toBeTruthy();
  });
});
