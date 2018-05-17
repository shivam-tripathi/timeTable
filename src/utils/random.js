import rn from 'random-number';

export const randomGenerator = (_min, _max, _integer=true) => {
	return rn.generator({
		min:  _min,
		max:  _max,
		integer: _integer
	});
}