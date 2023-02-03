import { InventairesModule } from './inventaires.module';

describe('InventairesModule', () => {
  let inventairesModule: InventairesModule;

  beforeEach(() => {
    inventairesModule = new InventairesModule();
  });

  it('should create an instance', () => {
    expect(inventairesModule).toBeTruthy();
  });
});
