"use client";

import { useState } from "react";
import { saveMeeting } from "../actions";
import type { Prospect } from "@prisma/client";

const inputCls = "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm";
const selectCls = inputCls;
const btnPrimary = "inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2";

const LOCATION_LABELS: Record<string, string> = {
    video: "Video Link",
    phone: "Phone Number",
    physical: "Address / Location",
    no_meeting: "",
};

interface Props {
    prospect: Prospect & { payments: any[] };
    // These are passed in so we don't need to re-define them, but we use local constants above.
    // Kept for signature parity with the call-site.
    saveMeeting?: never;
    inputCls?: never;
    selectCls?: never;
    btnPrimary?: never;
}

export function Stage2TractionForm({ prospect }: Props) {
    const [meetingType, setMeetingType] = useState<string>(prospect.meetingType ?? "video");

    const locationLabel = LOCATION_LABELS[meetingType] ?? "Location / Link";

    // Format existing meetingTime to HH:MM for the time input default value
    const defaultTime = prospect.meetingTime
        ? prospect.meetingTime.toISOString().substring(11, 16)
        : "";

    const defaultDate = prospect.meetingDate
        ? prospect.meetingDate.toISOString().split("T")[0]
        : "";

    return (
        <div className="rounded-md border bg-card p-6 shadow-sm border-primary/20">
            <h2 className="text-xl font-semibold mb-4">Stage 2: Traction</h2>
            <form action={saveMeeting} className="flex flex-col gap-4">
                <input type="hidden" name="prospectId" value={prospect.id} />

                {/* Meeting Type */}
                <div className="grid gap-2">
                    <label className="text-sm font-medium">Meeting Type</label>
                    <select
                        name="meetingType"
                        className={selectCls}
                        value={meetingType}
                        onChange={(e) => setMeetingType(e.target.value)}
                    >
                        <option value="video">Video Call</option>
                        <option value="phone">Phone Call</option>
                        <option value="physical">Physical / In-Person</option>
                        <option value="no_meeting">No meeting</option>
                    </select>
                </div>

                {meetingType === "no_meeting" ? (
                    <input type="hidden" name="done" value="on" />
                ) : (
                    <>
                        {/* Date + Time row */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <label className="text-sm font-medium">Meeting Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    defaultValue={defaultDate}
                                    className={inputCls}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <label className="text-sm font-medium">Meeting Time</label>
                                <input
                                    type="time"
                                    name="time"
                                    defaultValue={defaultTime}
                                    className={inputCls}
                                />
                            </div>
                        </div>

                        {/* Dynamic location field */}
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">{locationLabel}</label>
                            <input
                                type={meetingType === "video" ? "url" : "text"}
                                name="meetingLocation"
                                defaultValue={prospect.meetingLocation ?? ""}
                                className={inputCls}
                                placeholder={
                                    meetingType === "video"
                                        ? "https://meet.google.com/..."
                                        : meetingType === "phone"
                                            ? "+1 234 567 8901"
                                            : "e.g. Latitude House, Limbe"
                                }
                            />
                        </div>

                        {/* Done checkbox */}
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="done"
                                name="done"
                                className="h-4 w-4"
                                defaultChecked={prospect.meetingDone}
                            />
                            <label htmlFor="done" className="text-sm">
                                Mark meeting as completed
                            </label>
                        </div>
                    </>
                )}

                <div className="flex justify-end mt-2">
                    <button type="submit" className={btnPrimary}>
                        Save Meeting (Move to Stage 3 if done)
                    </button>
                </div>
            </form>
        </div>
    );
}
