import { Scalar, CustomScalar } from '@nestjs/graphql';
import { GraphQLScalarLiteralParser, Kind, ValueNode } from 'graphql';
import moment from 'moment';
import { UserInputError } from 'apollo-server-express';

@Scalar('DateRegister', () => Date)
export class DateRegisterScalar implements CustomScalar<string, Date> {
  static readonly DEFAULT_FORMAT = 'MM/YYYY';

  description = 'Custom scalar date type: MM/YYYY';

  // value from the client;
  parseValue(value: number): Date {
    return new Date(value);
  }

  // value sent to the client
  serialize(value: Date): string {
    return moment(value).format(DateRegisterScalar.DEFAULT_FORMAT);
  }

  parseLiteral(ast: ValueNode): Date {
    if (ast.kind === Kind.STRING) {
      if (
        moment(ast.value, DateRegisterScalar.DEFAULT_FORMAT, false).isValid()
      ) {
        return new Date(ast.value);
      }
    }

    throw new UserInputError('Bad user input on scalar type Date');
  }
}
