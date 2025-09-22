package com.ricesnack.GrowIT_BE.game.dto;

import java.util.List;

public record GamePlayRequest (
        Long savedId,
        String policy,
        List<Integer> fire
){
}
