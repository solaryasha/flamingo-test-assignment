import React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cva } from 'class-variance-authority';
import cn from 'classnames';

const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
);

const Label = React.forwardRef(({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>, ref) => (
  <LabelPrimitive.Root
    ref={ref as React.Ref<HTMLLabelElement> | undefined}
    className={cn(labelVariants(), className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };