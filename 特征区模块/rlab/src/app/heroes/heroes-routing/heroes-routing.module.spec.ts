import { HeroesRoutingModule } from './heroes-routing.module';

describe('HeroesRoutingModule', () => {
  let heroesRoutingModule: HeroesRoutingModule;

  beforeEach(() => {
    heroesRoutingModule = new HeroesRoutingModule();
  });

  it('should create an instance', () => {
    expect(heroesRoutingModule).toBeTruthy();
  });
});
