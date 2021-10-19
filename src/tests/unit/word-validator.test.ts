import { WordValidator } from '../../api/validators';

describe('Work validator should', () => {
  describe('succeed on', () => {
    test('formatting word "Carlos Daniel"', () => {
      WordValidator.validate('Carlos Daniel');
    });

    test('formatting word "C3-P0"', () => {
      WordValidator.validate('C3-P0');
    });
  });

  describe('fail on', () => {
    test('formatting word "--  ==', () => {
      let errorThrown = null;
      try {
        WordValidator.validate('-- ==');
      } catch (err) {
        errorThrown = () => {
          throw err;
        };
      }
      expect(errorThrown).toThrowError();
    });

    test('formatting word "     "', () => {
      let errorThrown = null;
      try {
        WordValidator.validate('     ');
      } catch (err) {
        errorThrown = () => {
          throw err;
        };
      }
      expect(errorThrown).toThrowError();
    });

    test('formatting word " # @ "', () => {
      let errorThrown = null;
      try {
        WordValidator.validate(' # @ ');
      } catch (err) {
        errorThrown = () => {
          throw err;
        };
      }
      expect(errorThrown).toThrowError();
    });
  });
});
