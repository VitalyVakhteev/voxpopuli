package com.voxpopuli.voxpopuli;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResetPasswordRequest {
    private String resetUsername;
    private String oldPassword;
    private String newPassword;
}
