if (indexing_error.get() > 0) {expect(() => x.set(3,$M.jsa2mat([2, 1, 3], false, 'int32'), y)).toThrow();} else {x.set(3,$M.jsa2mat([2, 1, 3], false, 'int32'), y); expect($M.isequal(x, z)).toBeTruthy();}