
class BinaryReader {
	constructor(data: Buffer){
		this.data = data;
		this.pos = 0
	}
	_ensure(n){
		if(this.pos + n > this.data.Length){
			throw new Error(`not enough data left to read ${n} bytes`)
		}
	}
	takeByte() {
		this._ensure(1)
		const result = this.data[this.pos];
		this.pos++;
		return result;
	}
	takeString(encoding = 'utf8') {
		const strLen = this.takeInt()
		return this.takeRawString(strLen, encoding)
	}
	takeRawString(len, encoding = 'utf8'){
		this._ensure(len);
		const str = this.data.toString(encoding, this.pos, this.pos + len);
		this.pos += len;
		return str;
	}
	takeDouble() {
		this._ensure(8);
		const result = this.data.readDoubleLE(this.pos);
		this.pos += 8;
		return result;
	}
	takeFloat() {
		this._ensure(4);
		const result = this.data.readFloatLE(this.pos)
		this.pos += 4;
		return result;
	}
	takeInt() {
		this._ensure(4);
		console.log('pos: ' + this.pos)
		const result = this.data.readInt32LE(this.pos)
		this.pos += 4;
		return result;
	}
	takeArrayFloat(n) {
		this._ensure(n * 4);
		const result = new Float32Array(n);
		for(let i=0;i<n;++i){
			result[i] = this.data.readFloatLE(this.pos)
			this.pos += 4;
		}
		return result;
	}
	takeArrayUShort(n) {
		this._ensure(n * 2);
		const result = new Uint16Array();
		for(let i=0;i<n;++i){
			result[i] = this.data.readUInt16LE(this.pos)
			this.pos += 2;
		}
		return result;
	}
}

export function make(buf){
	return new BinaryReader(buf)
}

