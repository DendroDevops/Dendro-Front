import {AppPage} from './app.po';

describe('App home', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('should display components title', () => {
        page.navigateTo();
        expect(page.getParagraphText()).toEqual('Home');
    });
});
