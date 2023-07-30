import { PasswordInput, Progress, Text, Popover, Box } from "@mantine/core";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const PasswordRequirement = ({ meets, label }) => {
  return (
    <Text
      color={meets ? "green" : "red"}
      sx={{ display: "flex", alignItems: "center" }}
      mt={7}
      size="sm"
    >
      {meets ? (
        <CheckCircleIcon
          className="my-auto h-5 w-5 flex-shrink-0 text-green-500"
          aria-hidden="true"
        />
      ) : (
        <XCircleIcon
          className="my-auto h-5 w-5 flex-shrink-0 text-red-500"
          aria-hidden="true"
        />
      )}
      <Box ml={10}>{label}</Box>
    </Text>
  );
};

const requirements = [
  { re: /[0-9]/, label: "Includes number" },
  { re: /[a-z]/, label: "Includes lowercase letter" },
  { re: /[A-Z]/, label: "Includes uppercase letter" },
  { re: /[~`! @#$%^&*()_|;"'<:,>.?/+={[}-]/, label: "Includes special symbol" },
];
function getStrength(password) {
  let multiplier = password?.length > 7 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

export const Password = ({ form, disable }) => {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(form?.values?.password)}
    />
  ));

  const strength = getStrength(form?.values?.password);
  const color = strength === 100 ? "blue" : strength > 50 ? "blue" : "red";

  return (
    <Popover
      opened={popoverOpened}
      position="bottom-start"
      width="target"
      withArrow
      styles={{ popover: { width: "100%" } }}
      classNames={{
        root: "w-full",
        dropdown: "bg-gray-100 border-gray-700 border border-gray-300 ",
        arrow: "border border-gray-300 bg-gray-100",
      }}
      transitionProps={{ transition: "pop" }}
    >
      <Popover.Target>
        <div
          onFocusCapture={() => setPopoverOpened(true)}
          onBlurCapture={() => setPopoverOpened(false)}
        >
          <PasswordInput
            autoComplete={"new-Password"}
            label={"Password"}
            placeholder={"Your password"}
            {...form.getInputProps("password")}
            disabled={disable}
            aria-label={"Your password"}
            size="md"
            required
            classNames={{
              root: "w-full relative",
              visibilityToggle: "rounded-lg hover:bg-gray-300 text-gray-900",
              innerInput: "bg-white ring-0 text-black text-sm border-none",

              wrapper: "relative",
              error: "font-Poppin",
              input: `rounded-lg w-full bg-white border px-3 py-0.5 shadow-sm focus-within:border-blue-700 focus-within:ring-1 focus-within:ring-blue-700`,
              label:
                "absolute font-Merriweather -top-2 left-2 -mt-1 inline-block px-1 text-sm font-semibold text-gray-700 z-10 bg-white",
            }}
          />
        </div>
      </Popover.Target>

      <Popover.Dropdown>
        <Progress
          color={color}
          value={strength}
          size={7}
          style={{ marginBottom: 10 }}
        />
        <PasswordRequirement
          label="Includes at least 8 characters"
          meets={form?.values?.password?.length > 7}
        />
        {checks}
      </Popover.Dropdown>
    </Popover>
  );
};
