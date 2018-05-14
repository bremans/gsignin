import { GsigninPage } from './app.po';

describe('gsignin App', () => {
  let page: GsigninPage;

  beforeEach(() => {
    page = new GsigninPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
