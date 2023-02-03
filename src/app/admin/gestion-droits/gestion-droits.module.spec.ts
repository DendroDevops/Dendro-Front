import {GestionDroitsModule} from './gestion-droits.module';

describe('GestionDroitsModule', () => {
  let gestionDroitsModule: GestionDroitsModule;

  beforeEach(() => {
    gestionDroitsModule = new GestionDroitsModule();
  });

  it('should create an instance', () => {
    expect(gestionDroitsModule).toBeTruthy();
  });
});
