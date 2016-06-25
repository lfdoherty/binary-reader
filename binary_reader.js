
export class BinaryReader {
	constructor(data: Buffer){
		this.data = data;
		this.pos = 0
	}
	_ensure(int n){
		if(this.pos + n > this.data.Length){
			throw new Error(`not enough data left to read ${n} bytes`)
		}
	}
	takeDouble() {
		this._ensure(8);
		var result = this.data.readDoubleLE(this.pos);
		this.pos += 8;
		return result;
	}
	takeFloat() {
		this._ensure(4);
		var result = this.data.readFloatLE(this.pos)
		this.pos += 4;
		return result;
	}
	takeInt() {
		this._ensure(4);
		var result = this.data.readInt32LE(this.pos)
		this.pos += 4;
		return result;
	}
	takeArrayFloat(int n) {
		this._ensure(n * 4);
		const result = new Float32Array(n);
		for(int i=0;i<n;++i){
			result[i] = this.data.readFloatLE(this.pos)
			this.pos += 4;
		}
		return result;
	}
	takeArrayUShort(int n) {
		this._ensure(n * 2);
		const result = new Uint16Array();
		for(int i=0;i<n;++i){
			result[i] = this.data.readUint16LE(this.pos)
			this.pos += 2;
		}
		return result;
	}
}

