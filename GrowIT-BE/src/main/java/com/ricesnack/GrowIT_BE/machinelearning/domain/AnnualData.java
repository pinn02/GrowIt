package com.ricesnack.GrowIT_BE.machinelearning.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;

import java.lang.reflect.Field;

@Entity
@Table(name = "annual_data")
public class AnnualData {

    @Id
    private int year;

    private double unemployment_rate;
    private double BSI_Composite;
    private double real_wage_growth;
    private double growth_rate_qoq_lag1;
    private double population;
    private double GFCF_ICT_Real;
    private double unemployment_rate_MA3;
    private double BSI_Composite_MA3;
    private double unemployment_rate_change3;
    private double BSI_Composite_change3;
    private double unemployment_rate_MA6;
    private double BSI_Composite_MA12;
    private double real_wage_growth_change12;
    private double unemployment_rate_std3;
    private double BSI_Composite_std6;
    private double GDP;
    private double ICT_Production;
    private double ICT_Investment;
    private double CCSI;
    private double Corporate_Loan_Rate;
    private double Equipment_Investment_Index;
    private double productivity_index;
    private double Exchange_Rate;
    private double BSI_6M_MA;
    private double GDP_12M_MA;
    private double Exchange_Rate_12M_Std;
    private double CCSI_3M_Momentum;
    private double ICT_Prod_6M_Momentum;
    private double Loan_Rate_Lag_3M;
    private double Ad_Sentiment_DI;
    private double manufacturing_productivity;

    protected AnnualData() {}

    public int getYear() {
        return year;
    }

    public double getFeatureValue(String featureName) {
        try {
            String fieldName = toCamelCase(featureName);
            Field field = this.getClass().getDeclaredField(fieldName);
            field.setAccessible(true);
            return (double) field.get(this);
        } catch (NoSuchFieldException | IllegalAccessException e) {
            throw new IllegalArgumentException("Feature not found in AnnualData: " + featureName, e);
        }
    }

    private String toCamelCase(String s){
        if (s == null || !s.contains("_")) {
            return s;
        }
        String[] parts = s.split("_");
        StringBuilder camelCaseString = new StringBuilder(parts[0]);
        for (int i = 1; i < parts.length; i++){
            camelCaseString.append(toProperCase(parts[i]));
        }
        return camelCaseString.toString();
    }

    private String toProperCase(String s) {
        if (s == null || s.isEmpty()) {
            return s;
        }
        return s.substring(0, 1).toUpperCase() +
                s.substring(1).toLowerCase();
    }
}