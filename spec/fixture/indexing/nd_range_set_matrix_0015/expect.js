if (indexing_error.get() > 0) {expect(() => x.set($M.jsa2mat([5, 6, 2, 1, 7], false, 'int32'),$M.jsa2mat([12, 5, 10, 3, 11], false, 'int32'), y)).toThrow();} else {x.set($M.jsa2mat([5, 6, 2, 1, 7], false, 'int32'),$M.jsa2mat([12, 5, 10, 3, 11], false, 'int32'), y); expect($M.isequal(x, z)).toBeTruthy();}