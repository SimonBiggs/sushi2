if (indexing_error.get() > 0) {expect(() => x.get($M.jsa2mat([2, 4, 1, 5, 6], false, 'int32'),$M.jsa2mat([2, 1, 3, 4, 5], false, 'int32'))).toThrow();} else {var t = x.get($M.jsa2mat([2, 4, 1, 5, 6], false, 'int32'),$M.jsa2mat([2, 1, 3, 4, 5], false, 'int32')); if (typeof(t) === 'number') {t = $M.jsa2mat([[t]]);}; expect($M.isequal(t, y)).toBeTruthy();}