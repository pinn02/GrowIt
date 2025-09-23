package com.ricesnack.GrowIT_BE.machinelearning.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.lang.reflect.Field;

@Entity
@Table(name = "annual_data")
public class AnnualData {

    @Id
    private int year;

    private double unemploymentRate;
    private double bsiComposite;
    private double realWageGrowth;
    private double growthRateQoqLag1;
    private double population;
    private double gfcfIctReal;
    private double unemploymentRateMa3;
    private double bsiCompositeMa3;
    private double unemploymentRateChange3;
    private double bsiCompositeChange3;
    private double unemploymentRateMa6;
    private double bsiCompositeMa12;
    private double realWageGrowthChange12;
    private double unemploymentRateStd3;
    private double bsiCompositeStd6;
    private double gdp;
    private double ictProduction;
    private double ictInvestment;
    private double ccsi;
    private double corporateLoanRate;
    private double equipmentInvestmentIndex;
    private double productivityIndex;
    private double exchangeRate;
    private double bsi6mMa; // 수정됨
    private double gdp12mMa; // 수정됨
    private double exchangeRate12mStd; // 수정됨
    private double ccsi3mMomentum; // 수정됨
    private double ictProd6mMomentum; // 수정됨
    private double loanRateLag3m; // 수정됨
    private double manufacturingProductivity;
    private double applicationLag1;
    private double applicationLag2;
    private double corpDomesticApplications;
    private double corpDomesticRegistrations;
    private double loanAvg;
    private double loanAvgLag1;
    private double loanAvgLag2;
    private double registrationLag1;
    private double registrationLag2;
    private double regularAvgWage;
    private double rndTotal;
    private double rndTotalByIndustryAppSw;
    private double rndTotalByIndustryConsulting;
    private double rndTotalByIndustryEmbeddedSw;
    private double rndTotalByIndustryInfoSvc;
    private double rndTotalByIndustryProgrammingSvc;
    private double rndTotalByIndustrySystemSw;
    private double rndTotalByIndustryVirtualAsset;
    private double rndTotalLag1;
    private double rndTotalLag1x; // 수정됨
    private double rndTotalLag1y; // 수정됨
    private double rndTotalLag2;
    private double rndTotalLag2x; // 수정됨
    private double rndTotalLag2y; // 수정됨
    private double serviceProductivity;
    private double corporateLoansLaggedRate;
    private double corporateLoansLaggedRateLag6;
    private double corporateLoansLongRate;
    private double gfcfIctRealLongGfcfReal;
    private double gfcfRealMa6GfcfReal;
    private double gfcfRealMa6GfcfReal6yMa;
    private double ictImportsUsd;
    private double ictExportsUsd;
    private double infoCommValue;
    private double invFinalElectricSeasonal;
    private double invFinalElectricRaw;
    private double invFinalComputerSeasonal;
    private double invFinalComputerRaw;
    private double invFinalSpecialMachineSeasonal;
    private double invFinalSpecialMachineRaw;
    private double invLaggedElectricSeasonal;
    private double invLaggedComputerSeasonal;
    private double invLaggedSpecialMachineSeasonal;
    private double invLaggedElectricRaw;
    private double invLaggedComputerRaw;
    private double invLaggedSpecialMachineRaw;
    private double invLongElectricSeasonal;
    private double invLongComputerSeasonal;
    private double invLongSpecialMachineSeasonal;
    private double invLongElectricRaw;
    private double invLongComputerRaw;
    private double invLongSpecialMachineRaw;
    private double ma6Electric;
    private double ma6Computer;
    private double ma6SpecialMachine;
    private double ma6yElectric;
    private double ma6yComputer;
    private double ma6ySpecialMachine;
    private double totalAssets;
    private double totalInvestment;
    private double cpi;

    public double getFeatureValue(String featureName) {
        String camelCaseFeatureName = toCamelCase(featureName);
        try {
            Field field = this.getClass().getDeclaredField(camelCaseFeatureName);
            field.setAccessible(true);
            return (double) field.get(this);
        } catch (NoSuchFieldException | IllegalAccessException e) {
            throw new IllegalArgumentException("Feature not found in AnnualData: " + featureName, e);
        }
    }

    private String toCamelCase(String snakeCase) {
        StringBuilder camelCase = new StringBuilder();
        boolean nextIsUpper = false;
        for (char c : snakeCase.toCharArray()) {
            if (c == '_') {
                nextIsUpper = true;
            } else {
                if (nextIsUpper) {
                    camelCase.append(Character.toUpperCase(c));
                    nextIsUpper = false;
                } else {
                    camelCase.append(c);
                }
            }
        }
        return camelCase.toString();
    }
}