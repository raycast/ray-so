import { useImmer } from 'use-immer';
import UIView from '@/app-kit/source/UIView';
import {
  Chip,
  Input,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Divider,
} from '@heroui/react';
import React from 'react';
import { randomBytes } from 'crypto';
import { format } from 'date-fns';
import { SolarPasswordMinimalisticInputLineDuotone } from '@/app-kit/icons/SolarPasswordMinimalisticInputLineDuotone';
import { SolarCrownLineDuotone } from '@/app-kit/icons/SolarCrownLineDuotone';
import { SolarLockPasswordLineDuotone } from '@/app-kit/icons/SolarLockPasswordLineDuotone';
import { SolarEyeLineDuotone } from '@/app-kit/icons/SolarEyeLineDuotone';
import { SolarRefreshLineDuotone } from '@/app-kit/icons/SolarRefreshLineDuotone';

type CreatePasscodeProps = {
  premium?: boolean;
};

const CreatePasscode: React.FC<CreatePasscodeProps> = ({}) => {
  const [state, updateState] = useImmer({
    password: '',
    confirmPassword: '',
  });

  const onChangeState = (
    field: 'password' | 'confirmPassword',
    value: string
  ) => {
    updateState((draft) => {
      draft[field] = value;
    });
  };

  const generateRandomPassword = () => {
    // Generate 8 random bytes (16 hex characters) and convert to uppercase
    const randomHex = randomBytes(8).toString('hex');

    // Get current date in 'yyMMdd' format
    const datePart = format(new Date(), 'yyMMdd');

    // Combine randomHex and datePart, trim to 16 characters if necessary
    const randomPassword = `${randomHex}${datePart}`.slice(0, 16);

    onChangeState('password', randomPassword);
    onChangeState('confirmPassword', randomPassword);
  };

  return (
    <Popover
      showArrow
      backdrop="opaque"
      classNames={{
        base: ['before:bg-default-200'],
        content: [
          'py-3 px-4 border border-default-200',
          'bg-linear-to-br from-white to-default-300',
          'dark:from-default-100 dark:to-default-50',
        ],
      }}
      placement="bottom-end"
      className="min-w-60"
    >
      <PopoverTrigger>
        <Button size="sm" variant="bordered">
          <SolarPasswordMinimalisticInputLineDuotone className="h-4 w-4" />
          Passcode
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        {(titleProps) => (
          <div className="px-1 py-2 flex flex-col gap-2 w-full">
            <h3
              className="text-small font-bold flex items-center gap-2"
              {...titleProps}
            >
              Link Password
              <Chip
                variant="bordered"
                size="sm"
                startContent={<SolarCrownLineDuotone className="h-3.5 w-3.5" />}
                className="text-xs"
              >
                Pro
              </Chip>
            </h3>
            <div className="flex flex-col gap-3">
              <Input
                size="sm"
                variant="bordered"
                label="Password"
                startContent={
                  <SolarLockPasswordLineDuotone className="h-3.5 w-3.5" />
                }
                endContent={<SolarEyeLineDuotone className="h-3.5 w-3.5" />}
                labelPlacement="outside"
                placeholder="Create Passcode"
                value={state.password}
                onChange={(e) => onChangeState('password', e.target.value)}
              />
              <Input
                size="sm"
                variant="bordered"
                label="Confirm Password"
                startContent={
                  <SolarLockPasswordLineDuotone className="h-3.5 w-3.5" />
                }
                endContent={<SolarEyeLineDuotone className="h-3.5 w-3.5" />}
                labelPlacement="outside"
                placeholder="Confirm Passcode"
                value={state.confirmPassword}
                onChange={(e) =>
                  onChangeState('confirmPassword', e.target.value)
                }
              />
              <Divider className="my-1" />
              <UIView className="flex items-center gap-2">
                <Button
                  onClick={generateRandomPassword}
                  isIconOnly
                  size="sm"
                  variant="bordered"
                >
                  <SolarRefreshLineDuotone className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="bordered" fullWidth>
                  Add Password
                </Button>
              </UIView>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default CreatePasscode;
