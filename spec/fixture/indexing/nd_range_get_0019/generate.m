x = rand(5, 3, 5);
y = 0;
z = 0;
indexing_error = 0;
try
y = x(1,end+0:end+0,[3 4 1 5 2]);
catch
indexing_error = 1;
end
save('-mat', 'result.mat', 'x', 'y', 'z', 'indexing_error')
