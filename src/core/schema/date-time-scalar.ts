import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';
import moment from 'moment';
import { UserInputError } from 'apollo-server-express';

@Scalar('DateTime', () => Date)
export class DateTimeScalar implements CustomScalar<string, Date> {
  description = 'Custom scalar DateTimeISO type: YYYY-MM-DDTHH:mm:ssZ';

  // value from the client;
  parseValue(value: number): Date {
    return new Date(value);
  }

  // value sent to the client
  serialize(value: Date): string {
    return moment(value).toISOString();
  }

  parseLiteral(ast: ValueNode): Date {
    if (ast.kind === Kind.STRING) {
      if (moment(ast.value).isValid()) {
        return new Date(ast.value);
      }
    }

    throw new UserInputError('Bad user input on scalar type DateTime');
  }
}
