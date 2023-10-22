/**
 * File for all mocked data!
 */

/**
 * string list of valid file paths
 */
export const validFiles: string[] = [
  "data/filepath1",
  "data/filepath2",
  "data/ten-star.csv",
  "data/ten-star_no_headings.csv",
  "data/empty.csv",
  "data/dol_ri_earnings_disparity.csv",
  "data/one-column.csv",
];

/**
 * Map of mocked data where keys are filepaths and values are 2D arrays of
 * strings representing the CSV data. Used for view.
 */
export const filepathMap = new Map<string, string[][]>([
  [
    "data/filepath1",
    [
      ["1", "2", "3", "4", "5"],
      ["The", "song", "remains", "the", "same."],
    ],
  ],
  [
    "data/filepath2",
    [
      ["a", "b", "c", "d", "e"],
      ["Hi", "my", "name", "is", "Ari"],
    ],
  ],
  [
    "data/ten-star.csv",
    [
      ["StarID", "ProperName", "X", "Y", "Z"],
      ["0", "Sol", "0", "0", "0"],
      ["1", "", "282.43485", "0.00449", "5.36884"],
      ["2", "", "43.04329", "0.00285", "-15.24144"],
      ["3", "", "277.11358", "0.02422", "223.27753"],
      ["3759", "96 G. Psc", "7.26388", "1.55643", "0.68697"],
      ["70667", "Proxima Centauri", "-0.47175", "-0.36132", "-1.15037"],
    ],
  ],
  [
    "data/ten-star_no_headings.csv",
    [
      ["0", "Sol", "0", "0", "0"],
      ["1", "", "282.43485", "0.00449", "5.36884"],
      ["2", "", "43.04329", "0.00285", "-15.24144"],
      ["3", "", "277.11358", "0.02422", "223.27753"],
      ["3759", "96 G. Psc", "7.26388", "1.55643", "0.68697"],
      ["70667", "Proxima Centauri", "-0.47175", "-0.36132", "-1.15037"],
    ],
  ],
  ["data/empty.csv", []],
  [
    "data/dol_ri_earnings_disparity.csv",
    [
      [
        "State",
        "Data Type",
        "Average Weekly Earnings",
        "Number of Workers",
        "Earnings Disparity",
        "Employed Percent",
      ],
      ["RI", "White", '" $1,058.47 "', "395773.6521", " $1.00 ", "75%"],
      ["RI", "Black", " $770.26 ", "30424.80376", " $0.73 ", "6%"],
      [
        "RI",
        "Native American/American Indian",
        " $471.07 ",
        "2315.505646",
        " $0.45 ",
        "0%",
      ],
      [
        "RI",
        "Asian-Pacific Islander",
        '" $1,080.09 "',
        "18956.71657",
        " $1.02 ",
        "4%",
      ],
      ["RI", "Hispanic/Latino", " $673.14 ", "74596.18851", " $0.64 ", "14%"],
      ["RI", "Multiracial", " $971.89 ", "8883.049171", " $0.92 ", "2%"],
    ],
  ],
  [
    "data/one-column.csv",
    [["Letter"], ["A (vowel)"], ["B"], ["B"], ["C"], ["Y (sometimes a vowel)"]],
  ],
]);

/**
 * Map of mocked data where keys are possible search queries including a
 * filepath, a column identifier, a value to search for, and a boolean
 * indicating whether the CSV has a header or not. The values are 2D arrays of
 * strings representing the rows in the CSV data containing the search value
 * using the column identifier critertie. Used for search.
 */
export const searchMap = new Map<string, string[][]>([
  ["data/filepath1 1 The true", [["The", "song", "remains", "the", "same."]]],
  [
    "data/filepath 2 e Ari true",
    [
      ["a", "b", "c", "d", "e"],
      ["Hi", "my", "name", "is", "Ari"],
    ],
  ],
  ["data/empty.csv 0 0 true", []],
  ["data/empty.csv 0 0 false", []],
  ["data/ten-star.csv 0 0 true", [["0", "Sol", "0", "0", "0"]]],
  ["data/ten-star.csv 0 0 false", [["0", "Sol", "0", "0", "0"]]],
  ["data/ten-star.csv StarID 0 true", [["0", "Sol", "0", "0", "0"]]],
  ["data/ten-star.csv StarID 4 true", []],
  [
    "data/ten-star_no_headings.csv 0 70667 true",
    [["70667", "Proxima Centauri", "-0.47175", "-0.36132", "-1.15037"]],
  ],
  [
    "data/ten-star_no_headings.csv 0 70667 false",
    [["70667", "Proxima Centauri", "-0.47175", "-0.36132", "-1.15037"]],
  ],
  [
    "data/dol_ri_earnings_disparity.csv 0 RI true",
    [
      ["RI", "White", '" $1,058.47 "', "395773.6521", " $1.00 ", "75%"],
      ["RI", "Black", " $770.26 ", "30424.80376", " $0.73 ", "6%"],
      [
        "RI",
        "Native American/American Indian",
        " $471.07 ",
        "2315.505646",
        " $0.45 ",
        "0%",
      ],
      [
        "RI",
        "Asian-Pacific Islander",
        '" $1,080.09 "',
        "18956.71657",
        " $1.02 ",
        "4%",
      ],
      ["RI", "Hispanic/Latino", " $673.14 ", "74596.18851", " $0.64 ", "14%"],
      ["RI", "Multiracial", " $971.89 ", "8883.049171", " $0.92 ", "2%"],
    ],
  ],
  [
    "data/dol_ri_earnings_disparity.csv 0 RI false",
    [
      ["RI", "White", '" $1,058.47 "', "395773.6521", " $1.00 ", "75%"],
      ["RI", "Black", " $770.26 ", "30424.80376", " $0.73 ", "6%"],
      [
        "RI",
        "Native American/American Indian",
        " $471.07 ",
        "2315.505646",
        " $0.45 ",
        "0%",
      ],
      [
        "RI",
        "Asian-Pacific Islander",
        '" $1,080.09 "',
        "18956.71657",
        " $1.02 ",
        "4%",
      ],
      ["RI", "Hispanic/Latino", " $673.14 ", "74596.18851", " $0.64 ", "14%"],
      ["RI", "Multiracial", " $971.89 ", "8883.049171", " $0.92 ", "2%"],
    ],
  ],
  [
    "data/dol_ri_earnings_disparity.csv State RI true",
    [
      ["RI", "White", '" $1,058.47 "', "395773.6521", " $1.00 ", "75%"],
      ["RI", "Black", " $770.26 ", "30424.80376", " $0.73 ", "6%"],
      [
        "RI",
        "Native American/American Indian",
        " $471.07 ",
        "2315.505646",
        " $0.45 ",
        "0%",
      ],
      [
        "RI",
        "Asian-Pacific Islander",
        '" $1,080.09 "',
        "18956.71657",
        " $1.02 ",
        "4%",
      ],
      ["RI", "Hispanic/Latino", " $673.14 ", "74596.18851", " $0.64 ", "14%"],
      ["RI", "Multiracial", " $971.89 ", "8883.049171", " $0.92 ", "2%"],
    ],
  ],
  ["data/dol_ri_earnings_disparity.csv State OH true", []],
  [
    "data/dol_ri_earnings_disparity.csv Data Type White true",
    [["RI", "White", '" $1,058.47 "', "395773.6521", " $1.00 ", "75%"]],
  ],
  [
    "data/dol_ri_earnings_disparity.csv Data Type Native American/American Indian true",
    [
      [
        "RI",
        "Native American/American Indian",
        " $471.07 ",
        "2315.505646",
        " $0.45 ",
        "0%",
      ],
    ],
  ],
  [
    "data/dol_ri_earnings_disparity.csv 1 White true",
    [["RI", "White", '" $1,058.47 "', "395773.6521", " $1.00 ", "75%"]],
  ],
  ["data/one-column.csv 0 A (vowel) true", [["A (vowel)"]]],
  ["data/one-column.csv 0 B true", [["B"], ["B"]]],
  ["data/one-column.csv Letter A (vowel) true", [["A (vowel)"]]],
  ["data/one-column.csv Letter B true", [["B"], ["B"]]],
]);
