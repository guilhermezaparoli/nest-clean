import { HashCompare } from '@/domain/forum/application/cryptography/hash-compare'
import { HashGenerator } from '@/domain/forum/application/cryptography/hash-generator'
import { Injectable } from '@nestjs/common'
import bcrypt from 'bcryptjs'

@Injectable()
export class BcryptHasher implements HashGenerator, HashCompare {
  private HASH_SALT_LENGHT = 8

  async hash(plain: string): Promise<string> {
    return await bcrypt.hash(plain, this.HASH_SALT_LENGHT)
  }

  async compare(plain: string, password: string): Promise<boolean> {
    return await bcrypt.compare(plain, password)
  }
}
