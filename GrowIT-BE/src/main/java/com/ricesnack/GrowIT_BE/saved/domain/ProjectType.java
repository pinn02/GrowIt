package com.ricesnack.GrowIT_BE.saved.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ProjectType {

    PUBLIC_PROJECT("정부/공공 프로젝트"),
    INTERNAL_PROJECT("사내 프로젝트"),
    GLOBAL_PROJECT("글로벌 프로젝트");

    private final String title;
}