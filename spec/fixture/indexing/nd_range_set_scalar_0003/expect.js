if (indexing_error.get() > 0) {expect(() => x.set($M.colon(1,2),$M.jsa2mat([2, 6, 5, 4, 7], false, 'int32'), y)).toThrow();} else {x.set($M.colon(1,2),$M.jsa2mat([2, 6, 5, 4, 7], false, 'int32'), y); expect($M.isequal(x, z)).toBeTruthy();}