if (indexing_error.get() > 0) {expect(() => x.get(1,$M.colon($M.end-2,2))).toThrow();} else {var t = x.get(1,$M.colon($M.end-2,2)); if (typeof(t) === 'number') {t = $M.jsa2mat([[t]]);}; expect($M.isequal(t, y)).toBeTruthy();}