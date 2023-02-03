import { ConfigInventaireModule } from './config-inventaire.module';

describe('ConfigInventaireModule', () => {
  let configInventaireModule: ConfigInventaireModule;

  beforeEach(() => {
    configInventaireModule = new ConfigInventaireModule();
  });

  it('should create an instance', () => {
    expect(configInventaireModule).toBeTruthy();
  });
});
