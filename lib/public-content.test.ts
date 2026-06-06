import assert from "node:assert/strict";
import test from "node:test";

import {
  getCatalogDepartmentBySlug,
  getCatalogDepartmentsForCourseLevel,
} from "@/lib/public-content";

test("course levels expose different department lists", () => {
  const certificate = getCatalogDepartmentsForCourseLevel("vocational-certificate").map((department) => department.slug);
  const diploma = getCatalogDepartmentsForCourseLevel("vocational-diploma").map((department) => department.slug);
  const bachelor = getCatalogDepartmentsForCourseLevel("bachelor-technology").map((department) => department.slug);

  assert.deepEqual(certificate, [
    "automotive",
    "machine-shop",
    "welding",
    "electric-power",
    "electronics",
    "construction",
    "civil",
    "architecture",
    "it",
  ]);
  assert.deepEqual(diploma, [
    "automotive",
    "electric-vehicle",
    "machine-shop",
    "welding",
    "electric-power",
    "electronics",
    "construction",
    "civil",
    "architecture",
    "mechatronics",
    "it",
  ]);
  assert.deepEqual(bachelor, ["automotive", "electric-power", "mechatronics", "it"]);
});

test("department catalog uses logo files from public/logo", () => {
  assert.equal(getCatalogDepartmentBySlug("automotive")?.logoPath, "/logo/a-lptc.png");
  assert.equal(getCatalogDepartmentBySlug("electric-vehicle")?.logoPath, "/logo/ev-lptc.png");
  assert.equal(getCatalogDepartmentBySlug("architecture")?.logoPath, "/logo/arc-lptc.png");
});
