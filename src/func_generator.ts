import Matrix = require('./matrix');
import util = require('./util');

declare type MatrixOrNumber = Matrix | number;
export function make_compare_func_all(operation: string): (A: MatrixOrNumber, B: MatrixOrNumber) => Matrix {
  var func_s_s = make_binary_arith_func(operation, false, false, 'logical');
  var func_s_m = make_binary_arith_func(operation, false, true, 'logical');
  var func_m_s = make_binary_arith_func(operation, true, false, 'logical');
  var func_m_m = make_binary_arith_func(operation, true, true, 'logical');
  return function (A: MatrixOrNumber, B: MatrixOrNumber) {
    A = util.force_cpu_scalar(A);
    B = util.force_cpu_scalar(B);
    if (A instanceof Matrix) {
      if (B instanceof Matrix) {
        return func_m_m(A, B);
      } else {
        return func_m_s(A, B);
      }
    } else {
      if (B instanceof Matrix) {
        return func_s_m(A, B);
      } else {
        return func_s_s(A, B);
      }
    }
  }
}

export function make_binary_arith_func(operation: string, a_mat: boolean, b_mat: boolean, dst_klass: string): (A: MatrixOrNumber, B: MatrixOrNumber) => Matrix {
  var l_shape;
  var l_size_check = '';
  var l_def_adata = '';
  var l_def_bdata = '';
  var l_get_a;
  var l_get_b;
  if (a_mat) {
    l_shape = 'A._size';
    l_def_adata = 'var a_data = A._data;';
    l_get_a = 'a_data[i]';
    if (b_mat) {
      l_size_check = 'if (!e_util.jsaequal(A._size, B._size)) {throw new Error("Dimension mismatch");}';
    }
  } else {
    l_get_a = 'A';
    if (b_mat) {
      l_shape = 'B._size';
    } else {
      l_shape = '[1,1]';
    }
  }
  
  if (b_mat) {
    l_def_bdata = 'var b_data = B._data;';
    l_get_b = 'b_data[i]';
  } else {
    l_get_b = 'B';
  }
  
  var l_opr_formatted = operation.replace('%a', l_get_a).replace('%b', l_get_b);
  
  var f: any;
  var e_Matrix = Matrix;
  var e_util = util;
  
  eval([
    'f = function(A, B) {',
    'var shape = ' + l_shape + ';',
    l_size_check,
    l_def_adata,
    l_def_bdata,
    'var dst = new e_Matrix(shape, "'+dst_klass+'");',
    'var dst_data = dst._data;',
    'for (var i = 0, length = dst._numel; i < length; i++) {',
    '  dst_data[i] = ' + l_opr_formatted + ';',
    '}',
    'return dst;',
    '}'
  ].join('\n'));
  return f;
}

export function make_binary_arith_func_all(operation: string): (A: MatrixOrNumber, B: MatrixOrNumber) => Matrix {
  var funcs = {};
  return function (A: MatrixOrNumber, B: MatrixOrNumber) {
    A = util.force_cpu_scalar(A);
    B = util.force_cpu_scalar(B);
    var dst_klass = util.commonklass(A, B);
    if (dst_klass == 'logical') {
      dst_klass = 'single';
    }
    var a_mat = A instanceof Matrix;
    var b_mat = B instanceof Matrix;
    var func_name = '' + a_mat + '_' + b_mat + '_' + dst_klass;
    var f = funcs[func_name];
    if (!f) {
      // compile (eval) function on first call
      f = make_binary_arith_func(operation, a_mat, b_mat, dst_klass);
      funcs[func_name] = f;
    }
    
    return f(A, B);
  }
}