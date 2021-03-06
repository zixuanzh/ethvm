import bn from 'bignumber.js'
import ethUnits from 'ethereumjs-units'

class Hex {
	hexString: string;
	constructor(_hex: Buffer) {
		this.hexString = '0x' + new Buffer(_hex).toString('hex')
	}
	toString(): string {
		return this.hexString
	}
	toBuffer(): Buffer {
		return new Buffer(this.hexString.substring(2), 'hex')
	}
}
class HexTime {
	time: string;
	constructor(_time: Buffer) {
		this.time = '0x' + new Buffer(_time).toString('hex')
	}
	toString(): string {
		return this.time
	}
	toBuffer(): Buffer {
		return new Buffer(this.time.substring(2), 'hex')
	}
	toDate(): Date {
		return new Date(new bn(this.time).toNumber() * 1000)
	}
}
class Address {
	address: string;
	constructor(_add: Buffer) {
		if (_add) {
			this.address = '0x' + new Buffer(_add).toString('hex')
			this.address = this.address == '0x' ? '0x0000000000000000000000000000000000000000' : this.address
		} else this.address = null
	}
	toString(): string {
		return this.address
	}
	toBuffer(): Buffer {
		return new Buffer(this.address.substring(2), 'hex')
	}
	toNakedAddress(): string {
		return this.address.toLowerCase().replace('0x', '')
	}
}
class Hash {
	hash: string;
	constructor(_hash: Buffer) {
		this.hash = '0x' + new Buffer(_hash).toString('hex')
		this.hash = this.hash == '0x' ? '0x0' : this.hash
	}
	toString(): string {
		return this.hash
	}
	toBuffer(): Buffer {
		return new Buffer(this.hash.substring(2), 'hex')
	}
}

class EthValue {
	value: string;
	constructor(_value: Buffer) {
		this.value = '0x' + new Buffer(_value).toString('hex')
		this.value = this.value == '0x' ? '0x0' : this.value
	}
	toEth(): number {
		return ethUnits.convert(new bn(this.value).toFixed(), 'wei', 'eth')
	}
	toWei(): number {
		return ethUnits.convert(new bn(this.value).toFixed(), 'wei', 'wei')
	}
	toGWei(): number {
		return ethUnits.convert(new bn(this.value).toFixed(), 'wei', 'gwei')
	}
	toString(): string {
		return this.value
	}
}
class HexNumber {
	value: string;
	constructor(_value: Buffer) {
		this.value = '0x' + new Buffer(_value).toString('hex')
		this.value = this.value == '0x' ? '0x0' : this.value
	}
	toNumber(): string {
		return new bn(this.value).toFixed()
	}
	toIntNumber(): number {
		return new bn(this.value).toNumber()
	}
	toString(): string {
		return this.value
	}
}

let common = {
	Hash: (_hash: Buffer): Hash => {
		return new Hash(_hash)
	},
	EthValue: (_value: Buffer): EthValue => {
		return new EthValue(_value)
	},
	HexNumber: (_value: Buffer): HexNumber => {
		return new HexNumber(_value)
	},
	Address: (_add: Buffer): Address => {
		return new Address(_add)
	},
	AddressFromHex: (_add: string) : Address => {
		return new Address(new Buffer(_add.toLowerCase().replace('0x', ''),'hex'))
	},
	Hex: (_hex: Buffer): Hex => {
		return new Hex(_hex)
	},
	HexTime: (_time: Buffer): HexTime => {
		return new HexTime(_time)
	},
	HexToBuffer: (_hex: string): Buffer => {
		_hex = _hex.substr(0,2) == '0x' ? _hex.substr(2) : _hex
		_hex = _hex.length % 2  ? '0' + _hex : _hex
		return new Buffer(_hex,'hex')
	}

}
export {
	common,
	Hash,
	EthValue,
	HexNumber,
	Address,
	Hex,
	HexTime
}