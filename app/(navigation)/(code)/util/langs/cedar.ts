const lang = {
  displayName: "Cedar",
  name: "cedar",
  scopeName: "source.cedar",
  patterns: [
    { include: "#comment" },
    { include: "#annotations" },
    { include: "#sections" },
    { include: "#keywords" },
    { include: "#variables" },
    { include: "#methods" },
    { include: "#functions" },
    { include: "#ipmethods" },
    { include: "#decimalmethods" },
    { include: "#datetimemethods" },
    { include: "#durationmethods" },
    { include: "#booleans" },
    { include: "#integers" },
    { include: "#constants" },
    { include: "#entities" },
    { include: "#namespacedTypes" },
    { include: "#strings" },
  ],
  repository: {
    comment: {
      name: "comment.line.double-slash.cedar",
      match: "//.*(?=$)",
    },
    annotations: {
      patterns: [
        {
          match: "\\s*([@][_a-zA-Z][_a-zA-Z0-9]*)\\(",
          captures: {
            "1": { name: "entity.name.decorator.cedar" },
          },
        },
      ],
    },
    sections: {
      patterns: [
        {
          name: "keyword.control.cedar",
          match: "\\b(?<!\\.)(permit|forbid|when|unless)\\b",
        },
      ],
    },
    keywords: {
      patterns: [
        {
          name: "keyword.operator.cedar",
          match: "\\b(in|has|like|if|then|else|is)\\b",
        },
      ],
    },
    variables: {
      patterns: [
        {
          name: "variable.other.cedar",
          match: "\\?(principal|resource)\\b",
        },
      ],
    },
    methods: {
      patterns: [
        {
          match: "\\.(contains|containsAll|containsAny|isEmpty|getTag|hasTag)\\(",
          captures: {
            "1": { name: "entity.name.function.member.cedar" },
          },
        },
      ],
    },
    functions: {
      patterns: [
        {
          match: "\\b(ip|decimal|datetime|duration)\\(",
          captures: {
            "1": { name: "support.function.cedar" },
          },
        },
      ],
    },
    ipmethods: {
      patterns: [
        {
          match: "\\.(isIpv4|isIpv6|isLoopback|isMulticast|isInRange)\\(",
          captures: {
            "1": { name: "entity.name.function.member.cedar" },
          },
        },
      ],
    },
    decimalmethods: {
      patterns: [
        {
          match: "\\.(lessThan|lessThanOrEqual|greaterThan|greaterThanOrEqual)\\(",
          captures: {
            "1": { name: "entity.name.function.member.cedar" },
          },
        },
      ],
    },
    datetimemethods: {
      patterns: [
        {
          match: "\\.(offset|durationSince|toDate|toTime)\\(",
          captures: {
            "1": { name: "entity.name.function.member.cedar" },
          },
        },
      ],
    },
    durationmethods: {
      patterns: [
        {
          match: "\\.(toMilliseconds|toSeconds|toMinutes|toHours|toDays)\\(",
          captures: {
            "1": { name: "entity.name.function.member.cedar" },
          },
        },
      ],
    },
    booleans: {
      patterns: [
        {
          name: "constant.language.boolean.cedar",
          match: "\\b(true|false)\\b",
        },
      ],
    },
    integers: {
      patterns: [
        {
          name: "constant.numeric.cedar",
          match: "\\b([1-9]+[0-9]*|0)\\b",
        },
      ],
    },
    constants: {
      patterns: [
        {
          name: "variable.other.constant.cedar",
          match: "\\b(?<!\\.)(principal|action|resource|context)\\b",
        },
      ],
    },
    entities: {
      patterns: [
        {
          match: '\\b(([_a-zA-Z][_a-zA-Z0-9]*::)*[_a-zA-Z][_a-zA-Z0-9]*)(?:::)(?=")',
          captures: {
            "1": { name: "entity.name.type.cedar" },
          },
        },
      ],
    },
    namespacedTypes: {
      patterns: [
        {
          match: "\\b(([_a-zA-Z][_a-zA-Z0-9]*::)+[_a-zA-Z][_a-zA-Z0-9]*)\\b",
          captures: {
            "1": { name: "entity.name.type.cedar" },
          },
        },
      ],
    },
    strings: {
      name: "string.quoted.double.cedar",
      begin: '"',
      end: '"',
      patterns: [
        {
          name: "constant.character.escape.cedar",
          match: "\\\\.",
        },
      ],
    },
  },
};

export default [lang];
