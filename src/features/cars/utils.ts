import {ICarBrand, ICarModel, ICarModelWithRelations} from "@/features/cars/types";
import {BRAND_LOGOS} from "@/lib/constants";

export const getFullModelName = (model: ICarModel | undefined) => {
    if (!model) return '';
    const series = model.series || '';
    const modelName = model.name || '';
    return `${series} ${modelName}`.trim();
};

export const getFullSubModelName = (model: ICarModelWithRelations | undefined) => {
    if (!model) return '';
    const engineName = model.engine?.name || '';
    const engineSeries = model.engine?.series || '';
    const modelCode = model.code || '';
    return `${engineName}.${engineSeries} ${modelCode}`.trim();
};

export const getFullModelDisplayName = (model: ICarModel) => {
    if (!model) return '';
    const fullModelName = getFullModelName(model);
    const code = model.code || '';
    return `${fullModelName} ${code}`.trim();
};

export const getModelFullName = (model: ICarModel) => {
    if (!model) return "Модель не выбрана";
    const fullModelName = getFullModelName(model);
    const fullSubModelName = getFullSubModelName(model);
    return `${fullModelName} ${fullSubModelName}`.trim();
};


const DEFAULT_LOGO = '/img/brands/default-logo.svg';

export const getBrandLogo = (brand?: Pick<ICarBrand, 'name'> | null): string => {
  if (!brand?.name) return DEFAULT_LOGO;

  const logoPath = BRAND_LOGOS[brand.name];
  if (!logoPath) return DEFAULT_LOGO;

  return `/img/brands/${logoPath}`;
};