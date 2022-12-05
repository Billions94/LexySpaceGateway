import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';
import moment from 'moment';
import { UserInputError } from 'apollo-server-express';

@Scalar('Date', () => Date)
export class DateScalar implements CustomScalar<string, Date> {
  static readonly DEFAULT_FORMAT = 'YYYY-MM-DD';

  description = 'Custom scalar date type: YYYY-MM-DD';

  // value from the client;
  parseValue(value: number): Date {
    return new Date(value);
  }

  // value sent to the client
  serialize(value: Date): string {
    return moment(value).format(DateScalar.DEFAULT_FORMAT);
  }

  parseLiteral(ast: ValueNode): Date {
    if (ast.kind === Kind.STRING) {
      if (moment(ast.value, DateScalar.DEFAULT_FORMAT, false).isValid()) {
        return new Date(ast.value);
      }
    }

    throw new UserInputError('Bad user input on scalar type Date');
  }
}
