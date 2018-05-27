var calculator = require('./calculator');

describe("when calculating win rates", () => {
  it("should return NaN for rates when 1st participant is not found", () => {
    const firstParticipant = 'MADE_UP_NAME';
    const matchResults = [ { participants: [ 'David', 'Peter' ],
        winners: ['David'] } ];
    const winRates = calculator({firstParticipant, matchResults});

    calculator({firstParticipant, matchResults}).then(({numGamesWith2ndParticipant,
      overallWinRate,
      overallLossRate,
      specificWinRate,
      specificLossRate,}) => {

        expect(overallWinRate).toEqual(NaN);
        expect(overallLossRate).toEqual(NaN);

      });
  });

  it("should calculate correct rate for 1st participant in 1 game", () => {
    const firstParticipant = 'David';
    const matchResults = [ { participants: [ 'David', 'Peter' ],
        winners: ['David'] } ];

    calculator({firstParticipant, matchResults}).then(({numGamesWith2ndParticipant,
      overallWinRate,
      overallLossRate,
      specificWinRate,
      specificLossRate,}) => {

        expect(overallWinRate).toEqual(100);
        expect(overallLossRate).toEqual(0);

      });
  });

  it("should calculate correct rate for 1st participant in 3 games", () => {
    const firstParticipant = 'David';
    const matchResults = [ { participants: [ 'David', 'Peter' ], winners: ['David'] },
        { participants: [ 'David', 'George' ], winners: ['George'] },
        { participants: [ 'David', 'Stephen' ], winners: ['David'] }];

    calculator({firstParticipant, matchResults}).then(({numGamesWith2ndParticipant,
      overallWinRate,
      overallLossRate,
      specificWinRate,
      specificLossRate,}) => {

        expect(winRates.overallWinRate.toFixed(2)).toEqual("66.67");
        expect(winRates.overallLossRate.toFixed(2)).toEqual("33.33");

      });
  });

  it("should return NaN for rates when 2nd participant is not found", () => {
    const firstParticipant = 'Bart', secondParticipant = 'MADE_UP_NAME';
    const matchResults = [ { participants: [ 'Bart', 'Lisa' ],
        winners: ['Bart'] } ];

    calculator({firstParticipant, secondParticipant, matchResults}).then(({numGamesWith2ndParticipant,
      overallWinRate,
      overallLossRate,
      specificWinRate,
      specificLossRate,}) => {

        expect(specificWinRate).toEqual(NaN);
        expect(specificLossRate).toEqual(NaN);

      });
  });

  it("should calculate correct rate for 1st participant against 2nd participant", () => {
    const firstParticipant = 'Bart', secondParticipant = 'Homer';
    const matchResults = [ { participants: [ 'Bart', 'Lisa' ], winners: ['Bart'] },
    { participants: [ 'Bart', 'Homer' ], winners: ['Homer'] },
    { participants: [ 'Bart', 'Maggie' ], winners: ['Bart'] },];

    calculator({firstParticipant, secondParticipant, matchResults}).then(({numGamesWith2ndParticipant,
      overallWinRate,
      overallLossRate,
      specificWinRate,
      specificLossRate,}) => {

      expect(overallWinRate.toFixed(2)).toEqual("66.67");
      expect(overallLossRate.toFixed(2)).toEqual("33.33");
      expect(specificWinRate).toEqual(0);
      expect(specificLossRate).toEqual(100);

    });
  });
});