if (indexing_error.get() > 0) {expect(() => x.set($M.jsa2mat([1], false, 'int32'),2, y)).toThrow();} else {x.set($M.jsa2mat([1], false, 'int32'),2, y); expect($M.isequal(x, z)).toBeTruthy();}